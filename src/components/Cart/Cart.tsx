import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getUserCart } from '../../store/reducers/ActionCreators'
import CartItems from './CartItems'

function Cart() {
  //const [user] = useAuthState(auth);
  //console.log(user?.uid);
  //const {user} = useAppSelector(state => state.userReducer);
  // const  {setUser} = userSlice.actions;

  const dispatch = useAppDispatch()
  const { User } = useAppSelector((state) => state.userReducer)
  const { cart, isLoading } = useAppSelector(
    (state) => state.getUserCartReducer
  )

  useEffect(() => {
    dispatch(getUserCart(User?.id || 10))
  }, [])

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      <CartItems cart={cart} />
      <h1>{User?.id}</h1>
    </>
  )
}

export default Cart
