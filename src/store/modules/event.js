import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
    events: [],
    totalEvents: 0,
    event: {}
}
export const mutations = {
    ADD_EVENT(state, event) {
        state.events.push(event)
    },
    SET_EVENTS(state, events) {
        state.events = events
    },
    SET_TOTAL_EVENTS(state, total) {
        state.totalEvents = total
    },
    SET_EVENT(state, event) {
        state.event = event
    }
}
export const actions = {
    createEvent({commit}, event) {
        return EventService.postEvent(event)
        .then(() => {
        commit('ADD_EVENT', event)
        })
    },
    fetchEvents({commit}, {perPage, page}) {
        EventService.getEvents(perPage, page)
        .then(response => {
        //console.log('Total events are ' + response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
        commit('SET_TOTAL_EVENTS', parseInt(response.headers['x-total-count']))
        })
        .catch(error => {
        console.log('There was an error:', error.response)
        })
    },
    fetchEvent({commit, getters}, {id}) {
        var event = getters.getEventById(id)
        if (event) {
        commit('SET_EVENT', event)
        } else {
        EventService.getEvent(id)
        .then(response => {
            commit('SET_EVENT', response.data)
        })
        .catch(error => {
            console.log('There was an error:', error.response)
        })
        }
    }
}
export const getters = {
    getEventById: state => id => {
        return state.events.find(event => event.id === id)
    },
    getTotalEvents: state => {
        return state.totalEvents
    }
}