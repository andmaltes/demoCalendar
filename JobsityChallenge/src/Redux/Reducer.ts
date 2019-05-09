import { ADD_REMINDER, ADD_FORECAST } from './actions';
import { combineReducers, Reducer } from 'redux';
import { AppState } from './Interface';

/*
2019/05/08
Adding reducer that will:
Check whether the day of week is already defined. If not, will define it.
Check whether the reminder has less than 30 characters. If no, it will not add the reminder.
Andrés Maltés
*/
const days = (state: {} = [], action) => {
  switch (action.type) {
    case ADD_REMINDER:
      const stateNew = { ...state };
      const key = action.reminderToAdd.date.format('YYYY/MM/DD');
      if (typeof stateNew[key] === 'undefined') {
        stateNew[key] = {
          day: action.reminderToAdd.date.format('D'),
          reminders: []
        };
      }
      if (action.reminderToAdd.reminder == null) {
        return stateNew;
      }

      if (action.reminderToAdd.reminder.length <= 30) {
        stateNew[key].reminders = [
          ...stateNew[key].reminders,
          action.reminderToAdd
        ];
        return stateNew;
      } else {
        return stateNew;
      }

    default:
      return state;
  }
};
const forecast = (state: {} = [], action) => {
  switch (action.type) {
    case ADD_FORECAST:
      const stateNew = { ...state };
      if (typeof stateNew[action.forecast.city] === 'undefined') {
        stateNew[action.forecast.city] = {};
      }
      stateNew[action.forecast.city][action.forecast.date] = action.forecast;
      return stateNew;
    default:
      return state;
  }
};
export const reducer: Reducer<AppState> = combineReducers({
  days,
  forecast
});
