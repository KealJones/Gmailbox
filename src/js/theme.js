import { initMenu, reorderMenuItems, activateMenuItem, setupClickEventForNodes, } from './theme/menu';
import { setupNodes, _nodes } from './theme/nodes';
import { queryParentSelector } from './theme/predef';
import '../css/theme.css';

const init = (evt) => {
  setupNodes();
  initMenu();
  updateTitle();
  document.body.classList.toggle("_in");
}

const updateTitle = () => {
  const observer = new MutationObserver(() => {
    const { title } = _nodes;
    let linkElements = document.querySelectorAll(".aim a");
    if (title && linkElements.length > 0) {
      handleHashChange();
      observer.disconnect();
    }
    document.querySelectorAll('style:not(.scrollcheck)').forEach((element)=>{
      if (element.innerHTML.includes('scrollbar')){
        element.innerHTML = element.innerHTML.replace('scrollbar','nobar');
        element.className = element.className+' scrollcheck';
      }
    });
    var noNewMails = document.evaluate("//td[text()='No new mail!']", document, null, XPathResult.ANY_TYPE, null );
    var thisNoNewMail = noNewMails.iterateNext();
    thisNoNewMail.className = thisNoNewMail.className + ' empty-art';
    thisNoNewMail.parentElement.className = thisNoNewMail.parentElement.className + ' empty-wrap';
  });
  observer.observe(document.body, {subtree:true, childList:true});
}

const handleHashChange = (evt) => {
  let hash = window.location.hash;
  document.body.dataset.hash = hash;
  const { title } = _nodes;
  let linkElement = document.querySelector(`.aim a[href$="${hash}"]`);
  if (!title || !linkElement) {
    return;
  }
  let titleImg = title.querySelector('img');
  titleImg.src = 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x.png';
  titleImg.srcset = 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x.png 1x, https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_2x.png 2x';
  title.className = title.className+' white'
  setupSweepButtons();
}

const setupSweepButtons = () => {
  let sections = document.querySelectorAll(".ae4");
  sections.forEach((section) => {
    let sweepButton = section.querySelector("._inSweep");
    let buttonContainer = section.querySelector(".Cr");
    if (buttonContainer && !sweepButton) {
      sweepButton = document.createElement("button");
      sweepButton.classList.add("_inSweep");
      sweepButton.addEventListener("click", handleSweepButtonClick);
      buttonContainer.insertBefore(sweepButton, buttonContainer.firstChild);
    }
  })
}

/**

*/
const getMessageRowIsStarred = (elm) => {
  const starredButton = elm.querySelector(".T-KT");
  return starredButton && starredButton.classList.contains("T-KT-Jp");
}

/**

*/
const archiveMessageRow = (elm) => {
  const archiveButton = elm.querySelector(".brq");
  if (archiveButton) {
    archiveButton.click();
  }
}

const handleSweepButtonClick = (evt) => {
  let section = queryParentSelector(evt.target, ".aDM");
  section.querySelectorAll("tr").forEach((elm) => {
    if (!getMessageRowIsStarred(elm)) {
      archiveMessageRow(elm);
    }
  })
}

window.addEventListener("hashchange", handleHashChange);

if (document.head) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}
