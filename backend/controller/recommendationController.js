import axios from 'axios'

// Related Products
export const getRelatedProducts = async (req, res) => {
  const { user_id, item_id } = req.body

  try {
    const response = await axios.post('http://localhost:8000/cbf/recommend', {
      user_id,
      item_id
    })

    res.json(response.data) // gửi dữ liệu gợi ý về frontend
  } catch (error) {
    console.error('CBF Recommendation Error:', error.message)
    res.status(500).json({ error: 'Failed to fetch CBF recommendations' })
  }
}

// Customers Also Liked
export const getUserBasedProducts = async (req, res) => {


} 

// Frequently Bought Together
export const getItemBasedProducts = async (req, res) => {


} 

// Frequently Bought Together
export const getMatrixFactorProducts = async (req, res) => {


} 

// Recommended For You
export const getNeumfProducts = async (req, res) => {


} 
