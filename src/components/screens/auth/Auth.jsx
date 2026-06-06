// import React, { useState } from 'react'
// import { LoginForm } from './LoginForm'
// import { RegisterForm } from './RegisterForm'

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true)

//   return (
//     <div className="auth-container">
//       <div className="auth-menu">
//         <div className="auth-form">{isLogin ? <LoginForm /> : <RegisterForm />}</div>
//         <div className="mt-4 text-center">
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className={`auth-btn mx-auto inline-flex items-center justify-center rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 ${!isLogin ? 'active' : ''}`}
//           >
//             {isLogin ? 'Switch to Register' : 'Switch to Login'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Auth
import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="auth-container">
      <div className="auth-menu">
        <div className="auth-form">
          {isLogin ? (
            <LoginForm onSwitchForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchForm={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth
