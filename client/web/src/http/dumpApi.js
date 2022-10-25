import { $authHost } from "./index";

class DumpApi {
    addDump = async (dump) => {
        const data = await $authHost.post('dump', dump);
        console.log(data);
    }
    getAll = async () => {
        const data = await $authHost.get('dumps').then(res => res.data);
        return data;
    }
    getCurrent = async () => {
        const data = await $authHost.get('dumps?status=' + 1).then(res => res.data);
        return data;
    }
    delete = async (id) => {
        const data = await $authHost.put('dump', { id }).then(res => res.data);
        return data;
    }
    setConfirm = async (id) => {
        const data = await $authHost.put('admin_panel/change_dump_status', { id, status: 1 })
            .then(res => res.data);
        return data;
    }
    setDone = async (id) => {
        const data = await $authHost.put('admin_panel/change_dump_status', { id, status: 2 })
            .then(res => res.data);
        return data;
    }
}

export const dumpApi = new DumpApi();