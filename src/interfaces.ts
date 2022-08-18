
interface IPersonProps {
    id: number,
    name: string,
    gender: string,
    children: number[],
    parents: number[],
    couple?: number
}

interface INameDictProps {
    [key: string] : IPersonProps
}


interface IDepthDict {
    [key: string]: number[]
}

export type {
    IPersonProps,
    INameDictProps,
    IDepthDict
}
