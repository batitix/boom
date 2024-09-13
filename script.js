let eventTarget = {
  'main-topbar-btn': {
    fn: showModal,
    props: { 
      elementId: '#slide-up-modal',
      isSlideUpModal: true
    }
  },
  'close-slide-up-modal-btn': {
    fn: hideModal,
    props: {
      elementId: '#slide-up-modal'
    }
  },
  'show-slide-left-modal-1-btn': {
    fn: showModal,
    props: {
      elementId: '#slide-left-modal-1'
    }
  },
  'close-slide-left-modal-1-btn': {
    fn: hideModal,
    props: {
      elementId: '#slide-left-modal-1'
    }
  },
  'show-slide-left-modal-2-btn': {
    fn: showModal,
    props: {
      elementId: '#slide-left-modal-2'
    }
  },
  'close-slide-left-modal-2-btn': {
    fn: hideModal,
    props: {
      elementId: '#slide-left-modal-2'
    }
  },
  'close-all-modals-btn': {
    fn: closeAllModal
  }
}
let visibleModals = [];

document.addEventListener('click', function(event){
  event.preventDefault();
  if(eventTarget[event.target.id] !== undefined) {
    let handler = eventTarget[event.target.id];
    handler.fn(handler.props);
  }
});

function showModal(props) {
  let { elementId, isSlideUpModal } = props;
  let dialog = document.querySelector(elementId);
  if(visibleModals.indexOf(elementId) < 0) {
    dialog.style.transform = isSlideUpModal !== undefined && isSlideUpModal === true ? 'translateY(-100%)' : 'translateX(-100%)';
    document.body.style.overflowY = 'hidden';
    visibleModals.push(props);
  }
}

function hideModal({ elementId }) {
  let dialog = document.querySelector(elementId);
  let obj = visibleModals.find((item) => item.elementId === elementId);
  if (visibleModals.indexOf(obj) > -1) {
    dialog.style.transform = obj.isSlideUpModal !== undefined && obj.isSlideUpModal === true ? 'translateY(100%)' : 'translateX(100%)';
    document.body.style.overflowY = '';
    let index = visibleModals.indexOf(obj);
    visibleModals.splice(index, 1);
  }
}

function closeAllModal(props) {
    visibleModals.forEach((modal) => {
      // Get the modal dialog
      let dialog = document.querySelector(modal.elementId);
      dialog.style.transitionDuration = '0s';
      if (modal.isSlideUpModal) {
        dialog.style.transform = 'translateY(100%)';
      } else {
        dialog.style.transform = 'translateX(100%)';
      }
    });

    // Resetting all styles after a short delay to avoid interference with above transitions
    window.setTimeout(function () {
      visibleModals.forEach((modal) => {
        let dialog = document.querySelector(modal.elementId);
        dialog.style = '';
      });
      visibleModals = [];
    }, 100);
  }