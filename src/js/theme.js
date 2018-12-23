import {
  initMenu,
  reorderMenuItems,
  activateMenuItem,
  setupClickEventForNodes,
} from './theme/menu';
import {setupNodes, _nodes} from './theme/nodes';
import {queryParentSelector, contains} from './theme/predef';
import '../css/theme.css';

const init = evt => {
  setupNodes();
  setupMutationObserver();
  handleTitle();
  initMenu();
  handleNoNewMail();
  removeScrollBarStyles();
  document.body.classList.toggle('_in');
};

const setupMutationObserver = () => {
  const observer = new MutationObserver(() => {
    handleTitle();
    handleNoNewMail();
    handleHashChange();
    handleLeftPanel();
  });
  observer.observe(document.body, {subtree: true, childList: true});
};

const handleLeftPanel = () => {
  const observer = new MutationObserver(() => {
    if (document.querySelector('.bq9')) {
      if (document.querySelector('.bq9').className.includes('br3')) {
        document.body.classList.remove('left-panel-active');
      } else {
        document.body.classList.add('left-panel-active');
      }
    }
  });
  if (document.querySelector('.bq9')) {
    observer.observe(document.querySelector('.bq9'), {attributes: true});
  }
};

const handleTitle = () => {
  const {title} = _nodes;
  if (title) {
    let titleImg = title.querySelector('img');
    titleImg.src =
      'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x.png';
    titleImg.srcset =
      'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x.png 1x, https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_2x.png 2x';
    title.className = title.className + ' white';
  }
};

const removeScrollBarStyles = () => {
  const observer = new MutationObserver(() => {
    var scollStyleTags = contains('style', 'scrollbar');
    if (scollStyleTags.length) {
      scollStyleTags.forEach(element => {
        element.innerHTML = element.innerHTML.replace('scrollbar', 'nobar');
      });
    }
  });
  observer.observe(document.head, {subtree: true, childList: true});
};

const handleNoNewMail = () => {
  var thisNoNewMail = contains('td', 'No new mail!');
  if (thisNoNewMail.length) {
    thisNoNewMail.forEach(element => {
      if (!element.className.includes('empty-art')) {
        element.classList.add('empty-art');
        element.parentElement.classList.add('empty-wrap');
      }
    });
  }
};

const handleHashChange = evt => {
  let hash = window.location.hash;
  document.body.dataset.hash = hash;
  let linkElement = document.querySelector(`.aim a[href$="${hash}"]`);
  if (!linkElement) {
    return;
  }
  setupSweepButtons();
};

const setupSweepButtons = () => {
  let sections = document.querySelectorAll('.ae4');
  sections.forEach(section => {
    let sweepButton = section.querySelector('._inSweep');
    let buttonContainer = section.querySelector('.Cr');
    if (buttonContainer && !sweepButton) {
      sweepButton = document.createElement('button');
      sweepButton.classList.add('_inSweep');
      sweepButton.addEventListener('click', handleSweepButtonClick);
      buttonContainer.insertBefore(sweepButton, buttonContainer.firstChild);
    }
  });
};

const getMessageRowIsStarred = elm => {
  const starredButton = elm.querySelector('.T-KT');
  return starredButton && starredButton.classList.contains('T-KT-Jp');
};

const archiveMessageRow = elm => {
  const archiveButton = elm.querySelector('.brq');
  if (archiveButton) {
    archiveButton.click();
  }
};

const handleSweepButtonClick = evt => {
  let section = queryParentSelector(evt.target, '.aDM');
  section.querySelectorAll('tr').forEach(elm => {
    if (!getMessageRowIsStarred(elm)) {
      archiveMessageRow(elm);
    }
  });
};

window.addEventListener('hashchange', handleHashChange);

if (document.head) {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
