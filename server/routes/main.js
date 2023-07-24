const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/**
 * GET /
 * HOME
*/
router.get('', async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});

// router.get('', async (req, res) => {
//   const locals = {
//     title: "NodeJs Blog",
//     description: "Simple Blog created with NodeJs, Express & MongoDb."
//   }

//   try {
//     const data = await Post.find();
//     res.render('index', { locals, data });
//   } catch (error) {
//     console.log(error);
//   }

// });


/**
 * GET /
 * Post :id
*/
router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    }

    res.render('post', { 
      locals,
      data,
      currentRoute: `/post/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});


/**
 * POST /
 * Post - searchTerm
*/
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Seach",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });

    res.render("search", {
      data,
      locals,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * About
*/
router.get('/about', (req, res) => {
  res.render('about', {
    currentRoute: '/about'
  });
});


// function insertPostData () {
//   Post.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//     },
//     {
//       title: "build real-time, event-driven applications in Node.js",
//       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Learn how to limit netowrk traffic."
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Learn Morgan."
//     },
//   ])
// }

// function insertPostData () {
//   Post.insertMany([
//     {
//       title: "Creating a Real-Time Chat Application with Node.js and React",
//       body: "In this comprehensive guide, you will learn how to build a real-time chat application using Node.js for the backend and React for the frontend. You will explore technologies like Socket.io for handling real-time communication between users, Express.js for building the API, and MongoDB as the database to store chat messages and user information. By the end of this tutorial, you will have a fully functional chat application that allows users to send and receive messages instantly, making it a great learning resource for anyone interested in developing real-time applications with Node.js and React."
      
//       // This is a longer body that goes into more detail about the process of building the application, the step-by-step implementation, and the challenges one might encounter during the development process.
//       },
      
//       {
//       title: "Node.js Microservices: Building Scalable and Resilient Applications",
//       body: "Discover the world of Node.js microservices and learn how to design, build, and deploy scalable and resilient applications using this architecture. In this extensive tutorial, we will delve into the principles of microservices and explore the benefits they offer in terms of scalability, fault tolerance, and maintainability. You will get hands-on experience creating microservices using Node.js, Express.js, and other relevant tools, and learn how to communicate between services using protocols like HTTP or message queues. Moreover, we will cover essential topics like service discovery, load balancing, and fault tolerance to ensure your microservices are robust and reliable."
      
//       // The body provides a detailed explanation of what microservices are, why they are beneficial, and how Node.js can be utilized to implement this architectural pattern. It also covers various related concepts, best practices, and real-world examples.
//       },
      
//       {
//       title: "Securing Node.js Applications: Best Practices and Techniques",
//       body: "Security is paramount when it comes to web applications, and Node.js is no exception. In this extensive guide, you will explore the best practices and techniques to secure your Node.js applications from common vulnerabilities. We will cover topics such as input validation, preventing injection attacks, protecting against Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) attacks, and securing authentication and authorization processes. Additionally, you will learn about the role of security middleware, secure coding practices, and how to stay updated with security patches. By the end of this tutorial, you'll have a solid understanding of Node.js application security and be equipped to build applications that protect user data and maintain user trust."
      
//       // This body provides a detailed walkthrough of various security considerations, potential vulnerabilities, and the steps to mitigate risks and enhance the security of Node.js applications.
//       },
      
//       {
//       title: "Node.js Performance Optimization: Improving Speed and Efficiency",
//       body: "Optimizing the performance of your Node.js applications is essential for delivering a smooth user experience and reducing infrastructure costs. In this in-depth tutorial, you will learn practical strategies and techniques to enhance the speed and efficiency of your Node.js applications. We will cover profiling and benchmarking tools to identify performance bottlenecks, optimizing database queries with indexing and caching, leveraging asynchronous and non-blocking techniques, and using clustering to take advantage of multi-core processors. Additionally, you will discover tips for memory management, code optimization, and resource utilization. By the end of this guide, you will be well-versed in optimizing Node.js applications and be able to deliver high-performance, responsive web services."
      
//       // This detailed body covers a wide range of performance optimization techniques, including both theoretical explanations and practical implementations, allowing developers to understand and apply the concepts effectively.
//       },
      
//       {
//       title: "Scaling Node.js Applications: Strategies for Handling Growth",
//       body: "As your Node.js application gains popularity and user traffic increases, scalability becomes a critical aspect of its success. In this extensive guide, you will learn various strategies for scaling Node.js applications to handle growing demands. We will explore horizontal and vertical scaling approaches, load balancing techniques, caching mechanisms, and the use of message brokers for asynchronous processing. You will also gain insights into containerization with Docker and orchestration with Kubernetes to manage large-scale deployments efficiently. Whether you are running your application in a cloud environment or on-premises, this tutorial will equip you with the knowledge to scale your Node.js applications effectively and ensure they can handle any level of growth."
      
//       // The body provides comprehensive information on scalability strategies, including various deployment options and tools to manage and scale Node.js applications effectively.
//       },
//   ])
// }

// insertPostData();


module.exports = router;