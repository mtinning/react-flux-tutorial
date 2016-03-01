import Dispatcher from './Dispatcher'
import assign from 'object-assign'

class ViewDispatcher extends Dispatcher {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction(action) {
    super.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
}

var AppDispatcher = new ViewDispatcher();

export default AppDispatcher
