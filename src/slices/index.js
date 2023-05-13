import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import eventsReducer from './eventsSlice';

export default configureStore({ // Конфигурируем общее хранилище, передаем туда редьюсеры
  reducer: {
    users: usersReducer,
    events: eventsReducer,
  },
});
