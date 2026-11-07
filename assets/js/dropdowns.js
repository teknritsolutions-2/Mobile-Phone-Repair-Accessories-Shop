// Keep native selects as the form/data source while presenting readable menus.
export function initDropdowns() {
  let closeCurrent = null;
  document.querySelectorAll("select:not([multiple])").forEach((select) => {
    if (select.size > 1) return;
    const wrapper = document.createElement("div");
    wrapper.className = "select-control";
    select.before(wrapper);
    wrapper.append(select);
    const button = document.createElement("button");
    button.type = "button";
    button.id = `${select.id}-trigger`;
    button.className = "select-trigger";
    button.setAttribute("role", "combobox");
    button.setAttribute("aria-haspopup", "listbox");
    button.setAttribute("aria-expanded", "false");
    const text = document.createElement("span");
    button.append(text);
    const chevron = document.createElement("span");
    chevron.className = "select-chevron";
    chevron.setAttribute("aria-hidden", "true");
    button.append(chevron);
    wrapper.append(button);
    const labels = [...select.labels];
    labels.forEach((label, index) => {
      label.id ||= `${select.id}-label-${index}`;
      // Keep labels associated with the visible control, including form errors.
      label.htmlFor = button.id;
    });
    const labelIds = labels.map((label) => label.id).join(" ");
    if (labelIds) button.setAttribute("aria-labelledby", labelIds);
    else
      button.setAttribute(
        "aria-label",
        select.getAttribute("aria-label") || select.name,
      );
    const list = document.createElement("div");
    list.id = `${select.id}-options`;
    list.className = "select-options";
    list.setAttribute("role", "listbox");
    if (labelIds) list.setAttribute("aria-labelledby", labelIds);
    list.hidden = true;
    document.body.append(list);
    button.setAttribute("aria-controls", list.id);
    select.classList.add("select-native");
    select.tabIndex = -1;
    select.setAttribute("aria-hidden", "true");
    let active = select.selectedIndex;
    let prefix = "";
    let lastTyped = 0;
    let open = false;
    const options = () => [...select.options];
    const enabled = () =>
      options()
        .map((option, index) => (option.disabled ? -1 : index))
        .filter((index) => index >= 0);
    const place = () => {
      if (!open) return;
      const rect = button.getBoundingClientRect();
      const viewport = window.visualViewport;
      const top = viewport?.offsetTop || 0;
      const height = viewport?.height || innerHeight;
      const left = viewport?.offsetLeft || 0;
      const width = viewport?.width || innerWidth;
      const below = top + height - rect.bottom - 12;
      const above = rect.top - top - 12;
      const up = below < Math.min(list.scrollHeight, 260) && above > below;
      list.style.width = `${Math.min(rect.width, width - 24)}px`;
      list.style.left = `${Math.max(left + 12, Math.min(rect.left, left + width - list.getBoundingClientRect().width - 12))}px`;
      list.style.maxHeight = `${Math.max(48, Math.min(320, up ? above : below))}px`;
      list.style.top = `${up ? Math.max(top + 12, rect.top - Math.min(list.scrollHeight, above, 320) - 6) : rect.bottom + 6}px`;
    };
    const highlight = () => {
      [...list.children].forEach((option, index) => {
        option.dataset.active = String(index === active);
        option.setAttribute(
          "aria-selected",
          String(index === select.selectedIndex),
        );
      });
      const item = list.children[active];
      if (open && item) {
        button.setAttribute("aria-activedescendant", item.id);
        // Scroll the menu alone; scrollIntoView can also move the page.
        const bottom = item.offsetTop + item.offsetHeight;
        if (item.offsetTop < list.scrollTop) list.scrollTop = item.offsetTop;
        else if (bottom > list.scrollTop + list.clientHeight)
          list.scrollTop = bottom - list.clientHeight;
      } else button.removeAttribute("aria-activedescendant");
    };
    const render = () => {
      text.textContent =
        select.selectedOptions[0]?.textContent || "Choose an option";
      button.disabled = select.disabled;
      for (const name of [
        "aria-invalid",
        "aria-describedby",
        "aria-required",
      ]) {
        const value =
          name === "aria-required"
            ? select.required
              ? "true"
              : null
            : select.getAttribute(name);
        if (value) button.setAttribute(name, value);
        else button.removeAttribute(name);
      }
      list.replaceChildren(
        ...options().map((option, index) => {
          const item = document.createElement("div");
          item.id = `${select.id}-option-${index}`;
          item.className = "select-option";
          item.setAttribute("role", "option");
          item.setAttribute("aria-disabled", String(option.disabled));
          item.dataset.index = index;
          item.textContent = option.textContent;
          return item;
        }),
      );
      if (!options()[active] || options()[active].disabled)
        active = enabled()[0] ?? -1;
      highlight();
      place();
    };
    const close = (commit = false) => {
      if (!open) return;
      open = false;
      list.hidden = true;
      button.setAttribute("aria-expanded", "false");
      button.removeAttribute("aria-activedescendant");
      if (closeCurrent === close) closeCurrent = null;
      if (commit && active >= 0 && active !== select.selectedIndex) {
        select.selectedIndex = active;
        select.dispatchEvent(new Event("input", { bubbles: true }));
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
      render();
    };
    const show = () => {
      if (open || select.disabled) return;
      closeCurrent?.();
      active = select.selectedIndex >= 0 ? select.selectedIndex : enabled()[0];
      open = true;
      list.hidden = false;
      button.setAttribute("aria-expanded", "true");
      closeCurrent = close;
      place();
      highlight();
    };
    button.addEventListener("click", () => (open ? close() : show()));
    button.addEventListener("keydown", (event) => {
      const keys = [
        "ArrowDown",
        "ArrowUp",
        "Home",
        "End",
        "PageDown",
        "PageUp",
        "Enter",
        " ",
        "Escape",
      ];
      if (event.key === "Tab") {
        close(true);
        return;
      }
      if (event.key === "Escape") {
        if (open) {
          event.preventDefault();
          event.stopPropagation();
          close();
        }
        return;
      }
      if (keys.includes(event.key)) {
        event.preventDefault();
        if (event.key === "Enter" || event.key === " ") {
          open ? close(true) : show();
          return;
        }
        const wasOpen = open;
        show();
        const choices = enabled();
        const at = choices.indexOf(active);
        if (event.key === "Home") active = choices[0];
        else if (event.key === "End") active = choices.at(-1);
        else if (wasOpen) {
          const step =
            event.key === "PageDown"
              ? 10
              : event.key === "PageUp"
                ? -10
                : event.key === "ArrowDown"
                  ? 1
                  : -1;
          active =
            choices[Math.max(0, Math.min(choices.length - 1, at + step))];
        }
        if (event.altKey && event.key === "ArrowUp") close(true);
        else highlight();
      } else if (
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        event.preventDefault();
        show();
        const now = Date.now();
        prefix = now - lastTyped > 700 ? event.key : prefix + event.key;
        lastTyped = now;
        const repeated = [...prefix].every(
          (letter) => letter.toLowerCase() === prefix[0].toLowerCase(),
        );
        const query = repeated ? prefix[0] : prefix;
        const choices = enabled();
        const start = repeated ? choices.indexOf(active) + 1 : 0;
        const ordered = [...choices.slice(start), ...choices.slice(0, start)];
        const found = ordered.find((index) =>
          options()
            [index].textContent.trim()
            .toLowerCase()
            .startsWith(query.toLowerCase()),
        );
        if (found !== undefined) active = found;
        highlight();
      }
    });
    list.addEventListener("mousedown", (event) => event.preventDefault());
    list.addEventListener("click", (event) => {
      const item = event.target.closest(".select-option");
      if (!item || item.getAttribute("aria-disabled") === "true") return;
      active = Number(item.dataset.index);
      close(true);
      button.focus({ preventScroll: true });
    });
    button.addEventListener("blur", () => close(true));
    document.addEventListener("pointerdown", (event) => {
      if (!wrapper.contains(event.target) && !list.contains(event.target))
        close(true);
    });
    select.addEventListener("change", () => {
      active = select.selectedIndex;
      render();
    });
    select.addEventListener("focus", () => button.focus());
    select.addEventListener("invalid", (event) => {
      event.preventDefault();
      button.setAttribute("aria-invalid", "true");
      button.focus();
    });
    select.form?.addEventListener("reset", () =>
      setTimeout(() => {
        active = select.selectedIndex;
        close();
        render();
      }),
    );
    new MutationObserver(render).observe(select, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        "disabled",
        "required",
        "aria-invalid",
        "aria-describedby",
        "selected",
      ],
    });
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    window.visualViewport?.addEventListener("resize", place);
    render();
  });
}
