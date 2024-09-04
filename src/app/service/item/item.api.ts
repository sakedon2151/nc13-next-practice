// import { error } from "console";

export async function createItem(item: ItemModel): Promise<any | {status: number}> { // 자바 컨트롤러와 네이밍 일치
    try {
        const body = {
            id: item.id,
            name: item.name,
            quantity: item.quantity
        }
        const response = await fetch('http://223.130.135.124:8080/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data: any = await response.json()
        return data
    } catch {error} {
        console.log('', error)
        return {status: 500}
    }

}