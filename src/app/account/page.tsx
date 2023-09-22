import {NextPage} from "next";
import dynamic from "next/dynamic";

const Account = dynamic(() => import('@/components/screens/account/Account'), {
  ssr: false
})

const AccountPage: NextPage = () => {
  return <Account/>
}

export default AccountPage;