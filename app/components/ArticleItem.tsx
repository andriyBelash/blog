import React from "react";
import SvgLink from "./SVG/SvgLink";

export const ArticleItem: React.FC = () => {
  return (
    <article className="blog-item">
      <div className="blog-item--image">
        <img src="https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?t=st=1725805690~exp=1725809290~hmac=a465319f14a13e2f39177a6d4c7c8b5db16628cd419cc01f11d6e77dc8a8bfbe&w=2000" alt="image" />
      </div>
      <div className="blog-item--content">
        <time className="blog-item--content-date">Sunday , 1 Jan 2023</time>
        <a href="" className="blog-item--content-link">
          Bill Walsh leadership lessons
          <SvgLink/>
        </a>
        <p className="blog-item--content-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet architecto nulla voluptatibus aperiam obcaecati. A vitae maxime cumque ullam, quibusdam repellendus quas blanditiis amet, dolore assumenda nostrum beatae, magnam quod!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus fugiat pariatur omnis deleniti nam laboriosam veniam, totam at, nesciunt voluptates ullam aut aspernatur, quasi reprehenderit quisquam possimus iste odio blanditiis!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores qui iusto nisi cupiditate tempora perferendis necessitatibus vel magni culpa ipsam. Quae dolores dignissimos quam aliquam eos quis minima est delectus?
        </p>
      </div>
      {/* <div className="blog-items--tags"></div> */}
    </article>
  )
}