import './PatientHomeCard.css'

function PatientHomeCard({ name, page_link, icon }) {
  return (
    <a href={page_link} className="text-decoration-none card dashboard-card m-1">
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <h5 className="card-title m-0">{name}</h5>
        <i className={`ml-2 pt-3 fa fa-5x ${icon}`}></i>
      </div>
    </a>
  );
}

export default PatientHomeCard;
