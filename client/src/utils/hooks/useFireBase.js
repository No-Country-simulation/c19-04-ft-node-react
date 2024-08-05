import database from "../../connections/firebase";
import { ref, onValue, get, set } from "firebase/database";
import { useEffect, useState } from "react";

export default function useFireBase(path, initialValue) {
    const [state, setState] = useState(initialValue);
    useEffect(() => {
        const chatRef = ref(database, path);
        const unsubscribe = onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            setState(data);
        });
        return () => unsubscribe();
    }, [path]);
    const updateData = async (newData) => {
        const dbRef = ref(database, path);
        const dbSnapshot = await get(dbRef);
        const dbData = dbSnapshot.val();
        await set(dbRef, {
            ...dbData,
            ...newData,
        });
    };
    return [state, updateData];
}
