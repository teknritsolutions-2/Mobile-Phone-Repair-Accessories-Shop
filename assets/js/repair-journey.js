export const journeySteps = [
  [
    "Tell us what’s wrong",
    "Share your model and describe what has changed. No technical vocabulary needed.",
  ],
  [
    "Understand the options",
    "An assessment and a clear estimate help you decide what happens next.",
  ],
  [
    "Leave it in careful hands",
    "Agree on the work, prepare your device, and arrange your visit.",
  ],
  [
    "Get back to your everyday",
    "Review the outcome, collect your phone, and carry on with your day.",
  ],
];

export function initRepairJourney() {
  document.querySelectorAll("[data-journey]").forEach((button) =>
    button.addEventListener("click", () => {
      const index = Number(button.dataset.journey);
      document
        .querySelectorAll("[data-journey]")
        .forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
      document.querySelector("#journey-number").textContent = `0${index + 1}`;
      document.querySelector("#journey-copy").innerHTML =
        `<h3>${journeySteps[index][0]}</h3><p>${journeySteps[index][1]}</p>`;
    }),
  );
}
