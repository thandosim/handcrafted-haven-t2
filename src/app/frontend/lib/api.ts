const baseUrl = 'http://localhost:3000/api'

export async function fetchFeaturedProduct() {
    try {
        const res = await fetch(`${baseUrl}/product?limit=8`);
        //Simulate API Call
        await new Promise(resolve => setTimeout(resolve, 2000));
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw Error(await res.text());
        }
    } catch (error) {
        console.error(error);
    }
}

export async function fetchFeaturedSellers() {
    try {
        const res = await fetch(`${baseUrl}/sellers?limit=8`);
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw Error(await res.text());
        }
    } catch (error) {
        console.error(error);
    }
}