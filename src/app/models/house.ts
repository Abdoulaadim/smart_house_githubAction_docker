export interface House {

    id?: string;
    name?: string;
    address?: string;
    name_floor?: string;
    name_room?: string;
    name_device?: string;
    status? :status|any;
    
}

enum status{
    On,Off
}

