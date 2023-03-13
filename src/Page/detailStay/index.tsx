import React from 'react';
import { useParams } from 'react-router';
import Layout from '../../Components/Layout';
import stays from "../../dummy/stays.json"

const DetailStay = () => {
  const { stayId } = useParams()

  return (
    <Layout>
      {stayId}
    </Layout>
  )
}

export default DetailStay