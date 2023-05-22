// import { useSelector } from 'react-redux';
// import { selectIsLoginIn } from 'redux/auth/authSelectors';
// import { Navigate } from 'react-router-dom';

// export const PrivateRoute = ({ children }) => {
//   // const dispatch = useDispatch();

//   const isLogedIn = useSelector(selectIsLoginIn);
//   return isLogedIn ? children : <Navigate to="/login" />;
// };

import { useSelector } from 'react-redux';
import { selectIsLoginIn, selectIsActive } from 'redux/auth/authSelectors';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoginIn);
  const isActive = useSelector(selectIsActive);

  // Проверка на наличие значения isActive и перевод его в булевое значение
  const isAccessAllowed = isActive === 0;

  // Если пользователь залогинен и доступ разрешен, рендерим компоненты маршрута
  if (isLoggedIn && isAccessAllowed) {
    return children;
  }

  // Если пользователь не залогинен, перенаправляем на страницу входа
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Если доступ запрещен, перенаправляем на страницу с ограниченным доступом
  return <Navigate to="/login" />;
};
