# Image sources and framing audit

Photographs are locally hosted under the [Pexels License](https://www.pexels.com/license/) or [Unsplash License](https://unsplash.com/license). Product photographs and illustrations describe categories, not verified stock. Displayed prices are indicative and confirmed on enquiry.

| Asset             | Native size / ratio | Source and display decision                                                                                                                                                                                                       |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| studio-repair.jpg | 1400 × 933 / 3:2    | [Tima Miroshnichenko, Pexels 6755056](https://www.pexels.com/photo/6755056/). Home 1 hero and the About purpose section use full native proportions, no zoom; technician, tool, phone, and equipment remain visible.              |
| screen-repair.jpg | 1000 × 667 / 3:2    | [Tima Miroshnichenko, Pexels 6755075](https://www.pexels.com/photo/6755075/). Home 1 and the redesigned Home 2 screen-repair spotlight keep the landscape source intact. The source itself is a close-up; no extra crop is added. |
| repair-detail.jpg | 1400 × 2100 / 2:3   | [Revendo, Unsplash](https://unsplash.com/photos/Q_I49DIzHu8). Retained source from the previous Home 2 spotlight; no longer displayed in the redesigned third section.                                                            |
| case.jpg          | 1000 × 750 / 4:3    | [Andrey Matveev, Pexels 21854447](https://www.pexels.com/photo/21854447/). Replaces the rustic portrait. Full phone/case and props, centered in a 4:3 catalog frame.                                                              |
| audio.jpg         | 1000 × 750 / 4:3    | [Andrey Matveev, Pexels 33444591](https://www.pexels.com/photo/33444591/). Complete earbuds and open case. Hero, gallery, and modal use matching native proportions.                                                              |
| charger.jpg       | 1000 × 669 / 3:2    | [Steve A Johnson, Pexels 845239](https://www.pexels.com/photo/845239/). Retained older source; current product cards and dialogs use charger-desk.jpg.                                                                           |
| cable.svg         | 800 × 600 / 4:3     | Retained earlier illustration; no longer used by product cards or dialogs. Replaced with cable-photo.jpg.                                                                                                                         |
| stand.svg         | 800 × 600 / 4:3     | Retained earlier category illustration; current product cards and dialogs use the real stand-photo.jpg photograph.                                                                                                                |
| protector.svg     | 700 × 600 / 7:6     | Retained earlier category illustration; current product cards and dialogs use the real protector-photo.jpg photograph.                                                                                                            |
| favicon.svg       | Vector              | Original phone-frame brand mark in Steel & Ice colors.                                                                                                                                                                            |

The main image subjects use intentional `50% 50%` positioning. Repair photography has natural height; product images use contain fitting without hover zoom. No portrait is forced into a panoramic frame. HTML and dynamically generated images carry intrinsic dimensions. Card frames are 4:3; compact preview rows can use a square outer frame while retaining complete image proportions. Product dialogs retain 4:3 image areas with native scaling.

Actual image measurements and screenshots were collected at 390, 768, 1024, and 1440px, including all six product dialogs. Raw evidence is outside the repository under `/private/tmp/pp4-qa/` and `/private/tmp/pp4-final/`. Gallery source photographs and all rendered frames were inspected directly; tightly cropped candidate images were rejected before use.

Archivo and Inter are self-hosted under the SIL Open Font License. Complete licenses are in `assets/fonts/`; no Google Fonts runtime request is made.

## Services collection — real photographs only

All six images are real, locally hosted photographs covered by the [Pexels License](https://www.pexels.com/license/). Source links are also published in the Services photo credits.

| Asset                | Source / photographer                                                                                                            | Native local dimensions and framing                                                                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| service-screen.jpg   | [31884550, Fotografia Lui Vlad](https://www.pexels.com/photo/31884550/)                                                          | 1200 × 800. Whole cracked phone on a repair mat.                                                                                                                                 |
| service-battery.jpg  | [31862950, Fotografia Lui Vlad](https://www.pexels.com/photo/disassembled-smartphone-on-repair-workbench-31862950/)              | 1200 × 800. Removed battery and phone body fully visible; a secondary display reaches the original photograph’s right edge.                                                      |
| service-charging.jpg | [36755504, Jakub Zerdzicki](https://www.pexels.com/photo/sleek-smartphone-on-blue-paper-on-a-wooden-desk-36755504/)              | 1200 × 800. Wider composition shows the complete phone, charging port and speaker openings. Replaces the tight bottom-edge macro.                                                |
| service-software.jpg | [34353879, Andrey Matveev](https://www.pexels.com/photo/modern-smartphone-displaying-software-update-screen-34353879/)           | 1200 × 800. Complete phone displaying software update settings. Source resized to 1200 × 900, then 50px trimmed from the top and bottom background; phone remains fully visible. |
| service-camera.jpg   | [32932369, Prashant pacific](https://www.pexels.com/photo/modern-smartphone-and-camera-flat-lay-32932369/)                       | 1200 × 800. Complete phone back and camera lenses. Replaces the partial-phone close-up.                                                                                          |
| service-audio.jpg    | [17794870, David Kwewum](https://www.pexels.com/photo/a-smartphone-and-earphones-lying-on-an-empty-page-of-a-notebook-17794870/) | 1200 × 800. Complete phone, earbuds and case. Replaces the tightly cropped component macro.                                                                                      |

All six local files have identical dimensions: **1200 × 800 (3:2)**. The Services rows display them at their native ratio with no inset, letterboxing, hover zoom or additional CSS crop. The software photograph replaces the previous 1200×904 close-up; its original 4:3 composition includes enough background for a 3:2 trim while preserving the full phone. Other sources retain their previous compositions. Photos illustrate repair categories, not a guarantee of supported parts or models. No AI-generated imagery is used.

The browser suite checks both native file dimensions and equal rendered photo widths/heights at 320, 390, 768, 1024, 1280 and 1440px. All six photos render at the same 3:2 ratio at each width.

## Home 2 opening banner

`home2-banner.jpg` — [Tima Miroshnichenko, Pexels 6754839](https://www.pexels.com/photo/a-person-repairing-a-smartphone-6754839/), [Pexels License](https://www.pexels.com/license/). Real photograph of smartphone repair under a microscope, locally stored at 1800×1200. No generated imagery. Desktop uses a 74%-width photographic layer beneath a dark gradient, with the microscope, working hands and phone visible; mobile uses the complete native 3:2 photo fading into the banner background. RTL moves the photographic layer and gradient without mirroring the photograph.

## A little extra care — matching real product photographs

All three photos are locally hosted under the [Pexels License](https://www.pexels.com/license/) at exactly **1000×750 (4:3)**. No AI-generated or illustrated image is used in this section. The same photos appear in product cards and dialogs throughout the site.

| File                | Photographer and source                                                                                                  | Framing                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| protector-photo.jpg | [Rann Vijay, Pexels 7742506](https://www.pexels.com/photo/a-hand-holding-a-tempered-glass-of-samsung-galaxy-s9-7742506/) | Source downloaded at 1000×1500; 1000×750 window starts 500px below the original top. The entire held screen protector is visible. The secondary phone reaches the original source’s right edge.    |
| charger-photo.jpg (retained previous source) | [Alfin Auzikri, Pexels 12965167](https://www.pexels.com/photo/hand-of-a-person-holding-an-adaptor-12965167/)             | Source downloaded at 1000×1333; 1000×750 window starts 400px below the original top. Adapter body, plug pins, and USB socket remain fully visible with room around them.                           |
| stand-photo.jpg     | [Enovate Studio, Pexels 2587993](https://www.pexels.com/photo/smartphone-on-stand-2587993/)                              | Source downloaded at 1000×1333; 1000×750 window starts 500px below the original top. Complete phone and wooden holder/base remain visible. Peripheral plant and book props are background context. |

Frames in the Home 2 section are uniformly 4:3 at desktop, tablet and mobile sizes. Images use contain fitting without further cropping, zoom, or an illustration-specific inset. The shared catalogue and native product dialogs preserve the same photographs. Photos represent accessory categories; availability and device compatibility remain subject to enquiry.

## Accessories — all product imagery is real photography

All six product records now use locally hosted JPEG photographs at exactly **1000×750 (4:3)**: `case.jpg`, `cable-photo.jpg`, `protector-photo.jpg`, `audio.jpg`, `charger-photo.jpg`, and `stand-photo.jpg`. The Accessories hero also uses the same 1000×750 earbuds photograph. The case, earbuds, protector, charger and stand sources were inspected again; complete primary products remain visible. Existing source credits and framing decisions are above.

`cable-photo.jpg` replaces the last product illustration. Source: [USB-C cable 2017 A, Fructibus / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:USB-C_cable_2017_A.jpg), released under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). The original 3872×2904 photograph already has a 4:3 composition and shows the complete coil, USB-A connector and USB-C connector. It was resized to 1000×750 without cropping or padding. Close-up candidates with a missing connector or cable section were rejected.

The catalog keeps 4:3 frames even below 360px, replacing the previous small-screen square frame. Cards and dialogs use contain fitting with no zoom. No generated image or product illustration is rendered on the Accessories page. Photographer-provided background props may reach the source edges; the primary products are complete.

Product detail symbols sit beside the product names rather than over the photographs, so small-screen badges cannot obscure a connector or product edge.

## Replacement charger photograph

`charger-desk.jpg` — [Andrey Matveev, Pexels 28190457](https://www.pexels.com/photo/internet-technology-computer-business-28190457/), [Pexels License](https://www.pexels.com/license/). Real photograph of a white wall charger and coiled cable on a yellow surface. The native 4096×3072 composition was downloaded at 1200×900 and resized to 1000×750 without cropping or padding. Replaces the hand-held charger photo in Home 2’s middle accessory card and its shared catalogue/dialog record. The charger body and bundled cable remain fully in frame.
