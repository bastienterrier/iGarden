import Vue from 'vue';
import Vuex from 'vuex';
import { EggsCollect } from './interfaces/hens/hens.interface';
import { ToDoInterface } from './interfaces/todo/todo.interface';
import { MessageInterface } from './interfaces/message/message.interface';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    calendarEvents: {},
    eggsHistory: Array<EggsCollect>(),
    eggsCollect: new EggsCollect(),
    gardenCollect: { user: '' },
    tasksToDisplay: Array<ToDoInterface>(),
    tasks: Array<ToDoInterface>(),
    messages: Array<MessageInterface>(),
  },
  mutations: {
    setCalendarEvents(state, events) {
      state.calendarEvents = events;
    },
    setEggsHistory(state, history) {
      state.eggsHistory = history;
    },
    setEggsCollect(state, collect) {
      state.eggsCollect = collect;
    },
    setGardenCollect(state, collect) {
      state.gardenCollect = collect;
    },
    setTasksToDisplay(state, tasks) {
      state.tasksToDisplay = tasks;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
    addMessage(state, message) {
      state.messages.push(message);
    },
  },
  actions: {
    setCalendarEvents({ commit }, events) {
      commit('setCalendarEvents', events);
    },
    setEggsHistory({ commit }, history) {
      commit('setEggsHistory', history);
    },
    setEggsCollect({ commit }, collect) {
      commit('setEggsCollect', collect);
    },
    setGardenCollect({ commit }, collect) {
      commit('setGardenCollect', collect);
    },
    setTasksToDisplay({ commit }, tasks) {
      commit('setTasksToDisplay', tasks);
    },
    setTasks({ commit }, tasks) {
      commit('setTasks', tasks);
    },
    setMessages({ commit }, messages) {
      commit('setMessages', messages);
    },
    addMessage({ commit }, message) {
      commit('addMessage', message);
    },
  },
});
