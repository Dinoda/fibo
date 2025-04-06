/**
 * Element used to allow for listening of non-DOM element (unlike "Component")
 */
export default class Listenable {
  /**
   * Constructor, no parameter needed.
   */
  constructor() {
    this.__listeners = {};
  }

  /**
   * Adds a new listener for the given event type.
   *
   * @param event The event type you wish to listen to
   * @param cb The callback when the event is triggered
   */
  addListener(event, cb) {
    if (typeof cb !== "function") {
      throw new Error("Second parameter must be callable");
    }

    if (!this.__listeners[event]) {
      this.__listeners[event] = [];
    }

    this.__listeners[event].push(cb);
  }

  /**
   * Remove the given listener from the event's listeners
   *
   * @param event The event type it listens to
   * @param cb The callback you wish to remove from this event listeners
   *
   * @return boolean A boolean at "true" if the removal was successful, "false" if there was nothing to remove
   */
  removeListener(event, cb) {
    if (this.__listeners[event]) {
      const i = this.__listeners[event].indexOf(cb);

      if (i > -1) {
        this.__listeners[event].splice(i, 1);

        return true;
      }
    }

    return false;
  }

  /**
   * Triggers an event on the given Listenable
   *
   * @param event The event's name
   * @param data The data sent into the listener's callback
   *
   * @return None
   */
  trigger(event, data) {
    if (this.__listeners[event]) {
      for (const list of this.__listeners[event]) {
        setTimeout(() => {
          list(data);
        }, 0);
      }
    }
  }
}
