import React, { Component } from "react";
import { Tree } from 'antd';
import { Input } from 'antd';
const { TreeNode } = Tree;
const { Search } = Input;

class Imagenet extends Component {
    loop(data) {
        return data.map(item => {
            if (item.children && item.children.length) {
                return (
                    <TreeNode key={item.key} title={`${item.name} (${item.size})`}>
                    { this.loop(item.children) }
                    </TreeNode>
                )}
            return <TreeNode key={item.key} title={item.name} />;
        })
    }

    render() {
        return (
            <div>
                <Search placeholder="input search text" onSearch={value => {
                    if(this.props.search) {
                        this.props.search(value)
                    }
                }} enterButton />
                <Tree showLine>
                {this.loop(this.props.data)}
                </Tree>
            </div>
        )
    }
}

export default Imagenet;