class ReactiveDOM {
  constructor(listener) {
    //  Empty list of event types
    this.events = {}
    //  Get all DOM elements with data-<listener> attribute
    const domDataListeners = document.querySelectorAll(`[data-${listener}]`)
    //  For each element
    for (let i = 0; i < domDataListeners.length; i++) {
      const el = domDataListeners[i]
      const event = el.getAttribute(`data-${listener}`)
      //  Register event (defined through data-<listener>='<event>')
      this.register(el, event)
    }
  }
  //  Function to combine DOM elements with event names
  register(el, event) {
    //  Check if event exists in event list
    const eventExists = Array.isArray(this.events[event])
    //  If event exists, push el to the list
    if (eventExists) this.nodes[event].push(el)
    //  Or create a new list with the el as first item
    else this.events[event] = [el]
  }
  setNode(event, value) {
    //  Get all nodes that are registered under given event
    const nodes = this.events[event]
    //  Check if event exists
    const eventExists = Array.isArray(nodes)
    //  If event does not exist, terminate the script
    if (!eventExists) throw Error(`Event '${event}' does not exists`)
    //  Set innerHTML to all nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].innerHTML = value
    }
  }
  //  Function to broadcast an value to nodes
  set(...cast) {
    //  1 argument handler (is able to broadcast multiple events)
    if (cast.length === 1) {
      const arg = cast[0]
      if (typeof arg !== "object") throw Error("Argument must be an object")
      const events = Object.keys(arg)
      for (let i = 0; i < events.length; i++) {
        this.setNode(events[i], arg[events[i]])
      }
    } 
    //  2 arguments handler (will only broadcast one event)
    else this.setNode(...cast)
  }
}