// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { registration } from '../../redux/auth/authOperations';

// import { Button } from 'components/Button/Button';

// import s from './RegisterForm.module.scss';

// export const RegistrationForm = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   // const [confirmPassword, setConfirmPassword] = useState('');

//   const dispatch = useDispatch();

//   const handleSubmit = e => {
//     e.preventDefault();
//     dispatch(registration({ name, email, password }));

//     setName('');
//     setEmail('');
//     setPassword('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className={s.regForm}>
//       <label className={s.regLabel}>
//         Name:
//         <input
//           className={s.regInput}
//           type="text"
//           value={name}
//           onChange={e => setName(e.target.value)}
//         />
//       </label>
//       <label className={s.regLabel}>
//         Email:
//         <input
//           className={s.regInput}
//           type="email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//         />
//       </label>
//       <label className={s.regLabel}>
//         Password:
//         <input
//           className={s.regInput}
//           type="password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//         />
//       </label>

//       <Button type="submit" text="Register" />
//     </form>
//   );
// };
