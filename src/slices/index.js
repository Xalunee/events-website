import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './usersSlice';

export default configureStore({ // Конфигурируем общее хранилище, передаем туда редьюсеры
  reducer: {
    events: eventsReducer
  },
});
