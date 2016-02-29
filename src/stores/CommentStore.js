var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var comments = []; // collection of todo items

/**
 * Create a Comment item.
 * @param {string} text The content of the Comment
 */
function create(author, message) {
  // Using the current timestamp in place of a real id.
  var id = Date.now();
  comments[comments.length] = {
    id: id,
    author: author,
    message: message
  };
}

/**
 * Delete a TODO item.
 * @param {string} id
 */
function destroy(id) {
  delete comments[id];
}

var CommentStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return comments;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addComment: function(comment) {
    create(comment.author, comment.message)
    this.emitChange()
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {
      case 'create':
        name = action.name.trim();
        message = action.message.trim();
        if (text !== '') {
          create(name, message);
          CommentStore.emitChange();
        }
        break;

      case 'destroy':
        destroy(action.id);
        CommentStore.emitChange();
        break;

      // add more cases for other actionTypes, like TODO_UPDATE, etc.
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = CommentStore;
