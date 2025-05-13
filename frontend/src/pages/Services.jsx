import Layout from '../components/layout/Layout';
import React from 'react';

const Services = () => {
  const services = [
    {
      title: 'Candidate Screening',
      description: `This is the second step during the interview process, which checks the background of the candidate's education, experience, personal and medical history as each employee's details may vary depending on all supporting documents. This is done to get the highest quality candidates. This process is done in person.`,
      image: 'https://bcmgroup.in/wp-content/uploads/2024/03/candidate-verification-1.jpg',
    },
    {
      title: 'Documentation',
      description: `A consensus on the stated terms and conditions is essential for any arrangement to move forward smoothly. A comprehensive agreement serves as a formal channel through which both parties express their acceptance and commitment. Within its folds lie key components such as delegation of authority through a power of attorney, articulation of requirements through a letter of request, and delineation of roles and responsibilities in an employment contract. These documents not only ensure clarity, but also foster trust and mutual understanding, laying a solid foundation for fruitful collaboration.`,
      image: 'https://bcmgroup.in/wp-content/uploads/2024/03/Documentation-1.jpg',
    },
    {
      title: 'Visa Insurance and Processing',
      description: `Our service is dedicated to helping applicants navigate the complexities of visa insurance and processing requirements. We simplify the process by guiding individuals through the completion of the necessary forms and documentation, ensuring that all relevant details are accurately provided. From insurance policies to visa applications, we reduce the burden by offering comprehensive support, ultimately facilitating an easier and more efficient path to obtaining the necessary approvals and coverage.`,
      image: 'https://bcmgroup.in/wp-content/uploads/2024/03/insurance-and-visa-processing-1.jpg',
    },
    {
      title: 'The onboarding process',
      description: `One of the key responsibilities of a boss is to ensure the smooth integration of new members into the organization. This includes familiarizing them with the organization’s culture, approaches, and methodologies, as well as their jobs and responsibilities. By providing guidance, support, and mentorship, bosses help new recruits feel invited, valued, and ready to contribute to the group. Strong onboarding accelerates variational interactions, as well as improves employee commitment and retention, which ultimately contributes to the organization’s overall outcomes.`,
      image: 'https://bcmgroup.in/wp-content/uploads/2024/03/ONBOARDING-PROCESS.jpg',
    },
    {
      title: 'Service Station Departure',
      description: `At our association, we believe in offering each individual the individual attention they deserve. We must deal with the prosperity of our competitors by giving customized direction at every stage of their excursion. Whether it is encouraging what moves towards undertaking, proposing objections or putting them in touch with the perfect individuals, we are here to guarantee that our upcoming ones feel supported and safe. With our dedicated assistance, competitors can explore their ways knowing that they have a reliable partner who will give direction and support at any time.`,
      image: 'https://bcmgroup.in/wp-content/uploads/2024/03/SERVICE-POST-DEPARTURE.jpg',
    },
  ];

  return (
    <Layout>
      <div className="relative flex flex-col items-center bg-white pb-20">
      <h2 className="text-3xl font-bold text-start border-b-2 border-b-blue-500 pb-5 mt-5 text-teal-500 font-space-grotesk ">
        Our Services
      </h2>

        {/* Vertical Line */}
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 h-[calc(100%-8rem)] w-1 bg-gray-300">
  {/* Top Circle */}
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-300 rounded-full"></div>
  
  {/* Bottom Circle */}
  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-gray-300 rounded-full"></div>
</div>

        {services.map((service, index) => (
          <div key={index} className="w-full max-w-6xl relative">
            {/* Circle */}

            <div className="flex flex-col md:flex-row items-center py-16">
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-white border-4 border-red-500 rounded-full w-6 h-6 z-10"></div>

              {/* Content and Image */}
              {index % 2 === 0 ? (
                <>
                  {/* Text Left */}
                  <div className="md:w-1/2 px-6 text-center md:text-right">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">{service.title}</h2>
                    <p className="text-gray-700">{service.description}</p>
                  </div>
                  {/* Image Right */}
                  <div className="md:w-1/2 p-6">
                    <img src={service.image} alt={service.title} className="rounded-lg shadow-lg w-full h-56 object-cover" />
                  </div>
                </>
              ) : (
                <>
                  {/* Image Left */}
                  <div className="md:w-1/2 p-6">
                    <img src={service.image} alt={service.title} className="rounded-lg shadow-lg w-full h-56 object-cover" />
                  </div>
                  {/* Text Right */}
                  <div className="md:w-1/2 px-6 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">{service.title}</h2>
                    <p className="text-gray-700">{service.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Services;
