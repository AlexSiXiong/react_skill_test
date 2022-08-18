import {IPersonProps, INameDictProps, IDepthDict} from "./interfaces";
import {familyTree} from "./data";

function generate_dictTree(data: IPersonProps[]) {
    let familyDictTree =  Object.assign({}, ...data.map((x) => ({[x.id]: x})))
    return add_couple(familyDictTree)
}

function add_couple(dict_tree: INameDictProps) {
    // remove children not in the family data
    for (let i in dict_tree) {
        let cur = dict_tree[i]
        if (cur.children) {
            let children_arr = []
            for (let j in cur.children) {
                if (cur.children[j] in dict_tree) {
                    children_arr.push(cur.children[j])
                }
            }
            cur.children = children_arr
        }
        dict_tree[cur.id] = cur
    }

    // add couple
    for (let i in dict_tree) {
        let cur = dict_tree[i]
        if (cur.parents.length !== 0) {
            dict_tree[cur.parents[0]]['couple'] = cur.parents[1]
            dict_tree[cur.parents[1]]['couple'] = cur.parents[0]
        }
    }
    return dict_tree
}

function getTopPeople(dict_tree: INameDictProps) {
    let top_id: number[] = []

    // find top people
    for (let i in dict_tree) {
        let cur = dict_tree[i]
        if (cur.parents.length === 0 && cur.children.length === 0) {
            top_id.push(cur.id)
        }
    }

    let deep_parents = get_top_parent_id(dict_tree)
    return deep_parents.concat(top_id)
}

function getValueOfMaxKey(obj: IDepthDict) {
    return Object.keys(obj).reduce((a, b) => obj[a] < obj[b] ? a : b);
}
function get_top_parent_id (family_dict: INameDictProps) {
    let depth_dict:IDepthDict = {}

    for (let i in family_dict) {
        let depth = get_max_family_depth(family_dict, family_dict[i], 0)

        if (!depth_dict[depth]) {
            depth_dict[depth] = []
        }

        depth_dict[depth].push(family_dict[i].id)

    }

    let deep_parents = depth_dict[getValueOfMaxKey(depth_dict)]

    for (let i in deep_parents) {
        let potential_top_person_id = deep_parents[i]
        let potential_couple = family_dict[potential_top_person_id].couple
        if (potential_couple) {
            deep_parents.splice(deep_parents.indexOf(deep_parents[potential_couple]), 1)
        }
    }
    return deep_parents
}
function get_max_family_depth (family_dict: INameDictProps, person: IPersonProps, depth: number) {
    let max_depth = depth
    let cur_depth = depth
    if (person.children) {
        for (let i in person.children) {
            let child_id = person.children[i]
            let depth = get_max_family_depth(family_dict, family_dict[child_id], cur_depth+1)
            if (depth >= max_depth) {
                max_depth = depth
            }
        }
    }
    return max_depth
}


const familyDictTree = generate_dictTree(familyTree)
const topPeopleIds = getTopPeople(familyDictTree)

export {
    familyDictTree,
    topPeopleIds
}
