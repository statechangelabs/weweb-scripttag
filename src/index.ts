import { Script } from "vm";

declare global {
  interface Window {
    ScriptTag: (string | ScriptTagObject)[] | typeof ScriptTag;
  }
}
type ScriptTagObject = {
  src?: string;
  async?: boolean;
  type?: string;
  content?: string;
  guid?: string;
};

const ScriptTag = {
  nextCheck: 0,
  push: (tag: string | ScriptTagObject) => {
    if (typeof tag === "string") {
      ScriptTag.push({ src: tag, async: true });
      return;
    }
    const script = document.createElement("script");
    if (tag.src) script.src = tag.src;
    script.async = true;
    if (tag.async) script.async = true;
    if (tag.type) script.type = tag.type;
    if (tag.content) script.innerHTML = tag.content;
    document.body.appendChild(script);
    ScriptTag.nextCheck = Date.now() + ScriptTag.FOUNDDELAY;
  },
  getFromPage: (document: Document) => {
    const scripts = document.querySelectorAll(".scripttag");
    const scriptTags: ScriptTagObject[] = [];
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      const scriptTagType = script.getAttribute("scripttag-type");
      const content = script.innerHTML;
      const src =
        script.getAttribute("scripttag-src") || script.getAttribute("src");
      if (src) {
        scriptTags.push({
          src,
          type: scriptTagType || undefined,
          content: content || undefined,
        });
      } else {
        const content = script.innerHTML;
        if (content) {
          if (scriptTagType) scriptTags.push({ content, type: scriptTagType });
          scriptTags.push({ src: content });
        }
      }
      script.setAttribute("class", "scripttag-complete");
    }
    scriptTags.forEach((tag) => ScriptTag.push(tag));
    return true;
  },
  init: () => {
    let tags: (string | ScriptTagObject)[] = [];
    if (window.ScriptTag) {
      //@ts-ignore
      tags = window.ScriptTag;
    }
    window.ScriptTag = ScriptTag;
    for (const tag of tags) {
      ScriptTag.push(tag);
    }
    const currentScript = document.currentScript;
    if (currentScript) {
      const src = currentScript.getAttribute("src");
      if (src) {
        //Check the url
        const url = new URL(src);
        const params = url.searchParams;
        const guid = params.get("guid");
        if (guid) {
          //get from scripttag
          ScriptTag.push({ guid });
        }
        ScriptTag.push({ src });
      }
    }
  },
  MAXWAIT: 30000,
  IDLEDELAY: 30000,
  FOUNDDELAY: 10000,
  SCRIPTTAGBASE: "https://",
};
export default ScriptTag;
ScriptTag.init();
window.addEventListener("load", () => {
  const lastPath = window.location.pathname;
  setInterval(() => {
    if (window.location.pathname !== lastPath) ScriptTag.nextCheck = 0;
    if (ScriptTag.nextCheck + ScriptTag.MAXWAIT < Date.now()) {
      ScriptTag.nextCheck = Date.now() + ScriptTag.IDLEDELAY;
    }
    if (Date.now() > ScriptTag.nextCheck) {
      if ((ScriptTag.nextCheck = 0)) ScriptTag.nextCheck = Date.now();

      ScriptTag.getFromPage(document);
    }
  }, 1000);
});
