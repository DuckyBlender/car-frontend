import { c as create_ssr_component, d as add_attribute, e as escape } from "../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let quality = 25;
  let speed = 50;
  return `

<div class="${"Hero"}"><div><h1>MY RC CAR FROM EVERYWHERE</h1>
        <img${add_attribute("src", "http://192.168.1.16:5000", 0)} alt="${"Live stream of the RC car"}"></div>
    <div class="${"bar"}">${`<p>Press a key</p>`}
            <label for="${"speedSlider"}">Speed: ${escape(speed)}</label>
            
            <input type="${"range"}" min="${"1"}" max="${"100"}" value="${"50"}" id="${"speedSlider"}">
            <label for="${"qualitySlider"}">Quality: ${escape(quality)}</label>
            
            <input type="${"range"}" min="${"1"}" max="${"90"}" value="${"25"}" id="${"qualitySlider"}"></div></div>`;
});
export {
  Page as default
};
