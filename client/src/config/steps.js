import { store } from "store";
import {
  setShowTutorialAction,
  setTutorialIndexAction
} from "actions/tutorialActions";
import ActionServiceFE from "services/ActionServiceFE";

const onExitTutorial = () => {
  const tour = store.getState().tutorial.tour;
  tour.cancel();
  store.dispatch(setShowTutorialAction(false));
  if (lastTutorialIndex !== 0) {
    ActionServiceFE.deal();
  }
};

const goToConfirmation = (currIndex) => {
  const tour = store.getState().tutorial.tour;
  tour.show("are-you-sure");
  lastTutorialIndex = currIndex;
};

const setTutorialIndex = (tutorialIndex) => {
  store.dispatch(setTutorialIndexAction(tutorialIndex));
};

let lastTutorialIndex = -1;

export const steps = [
  {
    id: "welcome",
    text: [
      `
      <h1 class="shepherd-h1">
      Welcome to Crack Blackjack!
      </h1>

      <p>
      Our website is designed to help you master the basic strategy and count cards like a pro. We assume you already know how
      to play blackjack, but if you don't click here.
      </p>
      
      <p>
      Hit the <strong>"STAND"</strong> button in the highlighted section to begin your journey to cracking blackjack.
      </p>

      <p>
      </p>
      `
    ],
    attachTo: { element: ".card-action-container", on: "left-start" },
    highlightElements: [".card-action-container"],
    classes: "shepherd shepherd-bottom-margin",
    when: {
      cancel: () => goToConfirmation(0),
      show: () => setTutorialIndex(0)
    }
  },
  {
    id: "actions",
    text: [
      `
      <h1 class="shepherd-h1">
      Actions
      </h1>

      <p>
      Here are the standard actions that you can do in a blackjack game. 
      </p>

      <p>
      The actions are greyed out whenever they are disabled or you cannot perform that action (e.g. you cannot split when there are more than two cards)
      </p>
      `
    ],
    attachTo: { element: ".card-action-container", on: "top-start" },
    highlightElements: [".card-action-container"],
    classes: "shepherd shepherd-bottom-margin",
    buttons: [
      {
        type: "back",
        text: "Back"
      },
      {
        type: "next",
        text: "Next"
      }
    ],
    when: {
      cancel: () => goToConfirmation(1),
      show: () => setTutorialIndex(1)
    }
  },
  {
    id: "player-cards",
    text: [
      `
      <h1>Player Cards</h1>
      <p>
      Here are your cards.
      </p>
      `
    ],
    attachTo: { element: ".player-cards-container", on: "left" },
    highlightElements: [".player-cards-container"],
    classes: "shepherd shepherd-right-margin",
    buttons: [
      {
        type: "back",
        text: "Back"
      },
      {
        type: "next",
        text: "Next"
      }
    ],
    when: {
      cancel: () => goToConfirmation(2),
      show: () => setTutorialIndex(2)
    }
  },
  {
    id: "dealer-cards",
    text: [
      `
      <h1>Dealer Cards</h1>
      <p>
      Here are the dealer's cards.
      </p>
      `
    ],
    attachTo: { element: ".dealer-cards-container", on: "left" },
    highlightElements: [".dealer-container", ".card-action-container"],
    classes: "shepherd shepherd-right-margin",
    buttons: [
      {
        type: "back",
        text: "Back"
      },
      {
        type: "next",
        text: "Next"
      }
    ],
    when: {
      cancel: () => goToConfirmation(3),
      show: () => setTutorialIndex(3)
    }
  },
  {
    id: "middle-info",
    text: [
      `
      <h1 class="shepherd-h1">
        Table Information
      </h1>

      <p>
      This middle container includes information like the correct decision for a given player and dealer hand and the running count of the deck.
      </p>
      `
    ],
    attachTo: { element: ".middle-info-container", on: "left" },
    highlightElements: [".middle-info-container"],
    classes: "shepherd shepherd-right-margin",
    buttons: [
      {
        type: "back",
        text: "Back"
      },
      {
        type: "next",
        text: "Next"
      }
    ],
    when: {
      cancel: () => goToConfirmation(4),
      show: () => setTutorialIndex(4)
    }
  },
  {
    id: "basic-strategy-chart",
    text: [
      `
      <h1>
      Basic Strategy Chart
      </h1>

      <p>
      Here are the basic strategys to determine what is the best action for the given player and dealer hands. 
      The left column is your hand and the top row is the dealer's hand.
      </p>

      <p>
      Below is a key for the basic strategy chart. If you are on mobile, you can scroll down on the chart until you can see the key.
      </p>
      `
    ],
    attachTo: { element: ".basic-strategy-container", on: "right" },
    highlightElements: [".basic-strategy-container"],
    classes: "shepherd shepherd-margin-left",
    buttons: [
      {
        type: "back",
        text: "Back"
      },
      {
        type: "next",
        text: "Next"
      }
    ],
    when: {
      cancel: () => goToConfirmation(5),
      show: () => setTutorialIndex(5)
    }
  },
  {
    id: "toggle-basic-strategy-chart",
    text: [
      `
      <h1 class="shepherd-h1">
      Toggle Basic Strategy Chart
      </h1>

      <p>
      Here you can toggle on/off the basic strategy chart and key.
      `
    ],
    attachTo: { element: ".toggle-basic-strategy-chart", on: "right" },
    highlightElements: [".toggle-basic-strategy-chart"],
    classes: "shepherd shepherd-margin-left",
    buttons: [
      {
        type: "back",
        text: "Back"
      },
      {
        type: "next",
        text: "Next"
      }
    ],
    when: {
      cancel: () => goToConfirmation(6),
      show: () => setTutorialIndex(6)
    }
  },
  {
    id: "additional-features",
    text: [
      `
      <h1>
      Additional Features
      </h1>

      <p>
        Here are more miscellaneous features (if you are on mobile, you will need to hit the <svg class="tutorial-inline-svg MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-ptiqhd-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MenuIcon"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
          icon to see these options):
      </p>
      <p>
      <svg class="tutorial-inline-svg MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-ptiqhd-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="InfoIcon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
      : contains information about the style of blackjack and counting being used in the website and shortcuts.
      </p>

      <p>
      <svg class="tutorial-inline-svg MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-ptiqhd-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="BarChartIcon"><path d="M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z"></path></svg>
      : shows statistics about your play (must be logged in to track statistics).
      </p>

      <p>
      <svg class="tutorial-inline-svg MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-ptiqhd-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SettingsIcon"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path></svg>
      : allows you to customize different aspects of the website to suit your needs.
      </p>
      `
    ],
    attachTo: { element: ".nav-top-right-container", on: "bottom" },
    highlightElements: [".nav-top-right-container"],
    classes: "shepherd shepherd-margin-top",
    buttons: [
      {
        type: "back",
        text: "Back"
      },
      {
        type: "next",
        text: "Next"
      }
    ],
    when: {
      cancel: () => goToConfirmation(7),
      show: () => setTutorialIndex(7)
    }
  },
  {
    id: "enjoy",
    text: [
      `
      <h1>
      Enjoy!
      </h1>

      <p>
      You can always come back to this tour by hitting the <svg class="tutorial-inline-svg MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-ptiqhd-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="InfoIcon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
      icon in the top right part of the navigation bar and then hitting the "START TOUR" button. 
      </p>
      `
    ],
    highlightElements: [],
    classes: "shepherd shepherd-margin-top",
    buttons: [],
    when: {
      cancel: onExitTutorial,
      show: () => setTutorialIndex(8)
    }
  },
  {
    id: "are-you-sure",
    text: [
      `
      <h1>
      Are you sure?
      </h1>

      <p>
      You can always come back to this tour by hitting the <svg class="tutorial-inline-svg MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-ptiqhd-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="InfoIcon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
      icon in the top right and then hitting the "START TOUR" button. 
      </p>
      `
    ],
    highlightElements: [],
    classes: "shepherd shepherd-margin-top shepherd-padding-bottom",
    buttons: [
      {
        classes: "shepherd-button-secondary",
        text: "Exit",
        action() {
          onExitTutorial();
        }
      },
      {
        text: "Back",
        action() {
          this.show(lastTutorialIndex);
        }
      }
    ],
    when: {
      cancel: onExitTutorial,
      show: () => setTutorialIndex(9)
    }
  }

  // ...
];
