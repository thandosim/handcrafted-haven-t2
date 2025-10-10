import User from "@/models/User"; 

// const baseUrl = 'http://localhost:3000/api'
const baseUrl =
  process.env.NODE_ENV === "production"
    ? `${process.env.APP_URL}/api`
    : "http://localhost:3000/api";


export async function fetchFeaturedProduct() {
    try {
        const res = await fetch(`${baseUrl}/product?limit=8`);
        if (res.ok) {
            const data = await res.json();
            return data.products ?? []; // Ensures an array is returned
        } else {
            throw Error(await res.text());
        }
    } catch (error) {
        console.error(error);
        return []; // Always returns an array on error
    }
}

export async function fetchFeaturedSellers() {
    try {
        const res = await fetch(`${baseUrl}/sellers?limit=8`);
        if (res.ok) {
            const data = await res.json();
            return data.sellers;
        } else {
            throw Error(await res.text());
        }
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}