# Image sources and framing audit

Photographs are locally hosted under the [Pexels License](https://www.pexels.com/license/) or [Unsplash License](https://unsplash.com/license). Product photographs and illustrations describe categories, not verified stock. Sample prices are illustrative.

| Asset | Native size / ratio | Source and display decision |
| --- | --- | --- |
| studio-repair.jpg | 1400 × 933 / 3:2 | [Tima Miroshnichenko, Pexels 6755056](https://www.pexels.com/photo/6755056/). Home 1 hero uses full native proportions, no zoom; technician, tool, phone, and equipment remain visible. |
| screen-repair.jpg | 1000 × 667 / 3:2 | [Tima Miroshnichenko, Pexels 6755075](https://www.pexels.com/photo/6755075/). Home 1 and Services keep the landscape source intact. The source itself is a close-up; no extra crop is added. |
| repair-detail.jpg | 1400 × 2100 / 2:3 | [Revendo, Unsplash](https://unsplash.com/photos/Q_I49DIzHu8). Home 2 spotlight preserves the portrait; max 340px wide on desktop, 300px tablet, 270px mobile. Open phone, tool, and working hands stay visible. |
| case.jpg | 1000 × 750 / 4:3 | [Andrey Matveev, Pexels 21854447](https://www.pexels.com/photo/21854447/). Replaces the rustic portrait. Full phone/case and props, centered in a 4:3 catalog frame. |
| audio.jpg | 1000 × 750 / 4:3 | [Andrey Matveev, Pexels 33444591](https://www.pexels.com/photo/33444591/). Complete earbuds and open case. Hero, gallery, and modal use matching native proportions. |
| charger.jpg | 1000 × 669 / 3:2 | [Steve A Johnson, Pexels 845239](https://www.pexels.com/photo/845239/). Replaces a cropped multi-object source. Complete adapter and pins, centered within a 4:3 frame with a small neutral inset. |
| cable.svg | 800 × 600 / 4:3 | Original Port & Pixel category illustration. Replaces a source-cropped cable photograph; coil and both USB-C ends are fully visible. |
| stand.svg | 800 × 600 / 4:3 | Original Port & Pixel category illustration. Replaces a tall lifestyle photograph that left large side gaps; shows a complete stand. |
| protector.svg | 700 × 600 / 7:6 | Original Port & Pixel illustration. Whole protector with a small inset in catalog frames. |
| favicon.svg | Vector | Original phone-frame brand mark in Steel & Ice colors. |

The main image subjects use intentional `50% 50%` positioning. Repair photography has natural height; product images use contain fitting without hover zoom. No portrait is forced into a panoramic frame. HTML and dynamically generated images carry intrinsic dimensions. Card frames are 4:3; compact preview rows can use a square outer frame while retaining complete image proportions. Product dialogs retain 4:3 image areas with native scaling.

Actual image measurements and screenshots were collected at 390, 768, 1024, and 1440px, including all six product dialogs. Raw evidence is outside the repository under `/private/tmp/pp4-qa/` and `/private/tmp/pp4-final/`. Gallery source photographs and all rendered frames were inspected directly; tightly cropped candidate images were rejected before use.

Archivo and Inter are self-hosted under the SIL Open Font License. Complete licenses are in `assets/fonts/`; no Google Fonts runtime request is made.

## Services collection — real photographs only

| Local file | Source | Photographer / license | Subject |
| --- | --- | --- | --- |
| service-screen.jpg | https://www.pexels.com/photo/31884550/ | Fotografia Lui Vlad / Pexels License | Cracked phone display on a repair mat. |
| service-battery.jpg | https://www.pexels.com/photo/31862950/ | Fotografia Lui Vlad / Pexels License | Disassembled phone with removed battery. |
| service-charging.jpg | https://www.pexels.com/photo/18662753/ | Masood Aslami / Pexels License | Smartphone charging port. |
| service-software.jpg | https://www.pexels.com/photo/a-hand-holding-a-smartphone-18275133/ | Watford London Media / Pexels License | Actual Android settings screen. |
| service-camera.jpg | https://www.pexels.com/photo/a-close-up-shot-of-a-smartphone-camera-5510605/ | Thiago Japyassu / Pexels License | Rear camera lenses. |
| service-audio.jpg | https://commons.wikimedia.org/wiki/File:IPhone_4,_model_A1332_-_loudspeaker_and_microphone-9448.jpg | © Raimond Spekking / CC BY-SA 4.0 (via Wikimedia Commons), https://creativecommons.org/licenses/by-sa/4.0/ | Actual loudspeaker and MEMS microphone. Resized and recompressed, no crop. |

All six files are locally stored photographs, not AI-generated assets. Native local dimensions are 1200×800 for screen/battery/charging, 1200×904 for software, 1200×900 for camera, and 1200×1200 for audio. Gallery frames use contain fitting to preserve the photographed components. The live Services page includes accessible source and license credits; documentation is not required for users to find the attribution.
