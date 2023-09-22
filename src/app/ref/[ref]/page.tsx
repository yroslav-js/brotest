"use client"

import {useRouter} from "next/navigation";

const ReferralPage = ({params}: { params: { ref: string } }) => {
  const router = useRouter()

  if (typeof window !== "undefined") {
    localStorage.setItem('ref', params.ref)
  }
  router.push('/')

  return null;
};

export default ReferralPage;