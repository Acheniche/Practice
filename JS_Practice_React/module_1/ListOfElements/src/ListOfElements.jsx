function ListOfElements() {

const photos= [
  {
    "albumId": 1,
    "id": 1,
    "title": "green",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  },
  {
    "albumId": 1,
    "id": 2,
    "title": "purple",
    "url": "https://via.placeholder.com/600/771796",
    "thumbnailUrl": "https://via.placeholder.com/150/771796"
  },
  ];

  return (
    <div>
        {photos.map(photo => (
            <div key={photo.id} >
                <h3>{photo.title}</h3>
                <img src={photo.thumbnailUrl} alt={photo.title} />
                  <a href={photo.url}>
                    Link to image
                  </a>
            </div>
        ))}
    </div>
  );
}

export default ListOfElements;
