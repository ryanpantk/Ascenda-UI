import DestinationForm from './../components/DestinationForm';
import fetch from 'cross-fetch';

async function fetchDestination(search) {
    return fetch('http://localhost:5000/apis/destination/' + search)
      .then((response) => response.json())
      .then((body) =>
        body.map((destination) => ({
          label: `${destination.term}`,
          key: destination._id,
          value: destination.uid,
        })),
      );
}
test('API response test', async()=>{
    const search = 'Singa';
    const data = await fetchDestination(search).then();

    const result = data.find(item =>item.label == 'Singapore, Singapore');
    expect(result).toBeDefined();
})
