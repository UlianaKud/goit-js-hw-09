const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.querySelector("body");let a=null;const r=()=>{let e=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;d.style.backgroundColor=e};e.addEventListener("click",(()=>{e.setAttribute("disabled","disabled"),t.removeAttribute("disabled","disabled"),r(),a=setInterval((()=>{r()}),1e3)})),t.addEventListener("click",(()=>{clearInterval(a),e.removeAttribute("disabled","disabled"),t.setAttribute("disabled","disabled")}));
//# sourceMappingURL=01-color-switcher.12206bbf.js.map
