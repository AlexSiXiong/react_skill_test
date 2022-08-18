import {IPersonProps, INameDictProps} from "./interfaces";
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
    let top_parents: number[] = []

    // find top people
    for (let i in dict_tree) {
        let cur = dict_tree[i]
        if (cur.parents.length === 0 && cur.children.length === 0) {
            top_id.push(cur.id)
        }
        if (cur.parents.length === 0 && cur.children.length !== 0 && cur.couple) {
            let cur_couple = dict_tree[cur.couple]
            if (cur_couple.parents.length === 0) {
                top_parents.push(cur.id)
            }
        }
    }

    let top_parent = get_top_parent_id(dict_tree, top_parents)
    return top_parent.concat(top_id)
}

// function getValueOfMaxKey(obj: IDepthDict) {
//     return Object.keys(obj).reduce((a, b) => obj[a] < obj[b] ? a : b);
// }

function get_top_parent_id (family_dict: INameDictProps, top_parents: number[]) {

    for (let i in top_parents) {
        let potential_top_person_id = top_parents[i]
        let potential_couple = family_dict[potential_top_person_id].couple
        if (potential_couple) {
            top_parents.splice(top_parents.indexOf(top_parents[potential_couple]), 1)
        }
    }
    return top_parents
}

const familyDictTree = generate_dictTree(familyTree)
const topPeopleIds = getTopPeople(familyDictTree)

export {
    familyDictTree,
    topPeopleIds
}
