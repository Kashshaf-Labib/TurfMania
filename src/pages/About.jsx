import Header from "./../components/Header/Header";
import Footer from "../components/Header/Footer";
import KashshafImage from "../assets/Kashshaf.jpg";
import NavidImage from "../assets/Navid.jpg";
import OniImage from "../assets/Oni.jpg";


const teamMembers = [
  {
    name: "Kashshaf Labib",
    position: "Undergrad Student of Software Engineering",
    Institution: "Islamic University of Technology",
    imageUrl: KashshafImage,
  },
  {
    name: "Navid Kamal",
    position: "Undergrad Student of Software Engineering",
    Institution: "Islamic University of Technology",
    imageUrl: NavidImage,
  },
  {
    name: "Rowshan Mannan",
    position: "Undergrad Student of Software Engineering",
    Institution: "Islamic University of Technology",
    imageUrl: OniImage,
  },
  
];

function About() {
  return (
    <div>
      <Header />
      <div className="about-us-container max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">About Us</h1>
      
      <section className="company-description my-8">
        <h2 className="text-3xl font-semibold mb-4">Our Company</h2>
        <p className="text-lg">
          Welcome to TurfMania, your ultimate destination for finding the best turfs around you. Our mission is to
          provide an easy and seamless way for turf enthusiasts to discover and book their favorite turfs. Whether you
          are looking to play football, cricket, or any other sport, TurfMania is here to connect you with the best
          options available.
        </p>
      </section>
      
      <section className="mission-statement my-8">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg">
          At TurfMania, we aim to revolutionize the way people book and manage turf facilities. Our platform is designed
          to bring convenience, transparency, and efficiency to the turf booking process, making it easier for users to
          find the perfect spot for their sporting activities.
        </p>
      </section>
      
      <section className="team-members my-8">
        <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member bg-white shadow-md p-4 rounded-lg">
              <div className="image-container w-full flex justify-center">
                <img src={member.imageUrl} alt={member.name} className="max-w-full h-auto"/>
              </div>
              <h3 className="text-2xl font-semibold text-center my-2">{member.name}</h3>
              <h4 className="text-xl text-center text-gray-700">{member.position}</h4>
              <p className="text-center text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="contact-info my-8">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p className="text-lg">
          If you have any questions or would like to get in touch with us, feel free to reach out at any time.
        </p>
        <p className="text-lg">
          Email: <a href="mailto:turfmania@gmail.com" className="text-blue-600">info@turfmania.com</a>
        </p>
        <p className="text-lg">
          Phone: <a href="tel:+1234567890" className="text-blue-600">+123 456 7890</a>
        </p>
      </section>
    </div>
      <Footer />
    </div>
  );
}

export default About;
