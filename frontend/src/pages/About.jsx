import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets'


const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-[450px] border' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos reprehenderit nulla iste illum maiores labore ea id placeat ducimus, vitae natus dolores vel! Facilis modi ea commodi aut odit amet?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic dicta qui sit laboriosam minima quis cumque a. Quisquam, neque ipsa. Assumenda explicabo est excepturi eligendi nihil! Accusantium quaerat et autem, nostrum voluptas iste suscipit blanditiis alias inventore. Rem, maxime incidunt sed, cupiditate quam iure nesciunt sunt dignissimos ea laborum eaque repellat voluptates est et ullam cum natus! Magnam nulla vero cum amet autem ab, hic earum debitis, ipsa voluptatum accusamus eaque soluta quam harum! Quos nemo eaque voluptatem aut. Nostrum assumenda veniam aliquid at adipisci quia doloremque molestias explicabo ullam magnam. Minima officiis autem amet ratione, veniam totam placeat mollitia.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione et error consequatur repellendus est iusto animi. Voluptate nisi ratione pariatur!</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance: </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente voluptatum placeat nobis totam numquam iste! Itaque minus nulla similique. Explicabo.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience: </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente voluptatum placeat nobis totam numquam iste! Itaque minus nulla similique. Explicabo.</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service: </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente voluptatum placeat nobis totam numquam iste! Itaque minus nulla similique. Explicabo.</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About