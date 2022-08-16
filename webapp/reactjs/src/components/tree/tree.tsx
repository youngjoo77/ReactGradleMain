import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import { Menu, MenuItem, Typography } from '@mui/material';
import { Folder, FolderOpen, FolderOff, ExpandMore, ChevronRight } from '@mui/icons-material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
// import Collapse from '@mui/material/Collapse';
// import { TransitionProps } from '@mui/material/transitions';
// import { useSpring, animated } from 'react-spring';

import * as Utils from '@/utils'

function MinusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

function CloseSquare(props: SvgIconProps) {
    return (
        <SvgIcon
            className="close"
            fontSize="inherit"
            style={{ width: 14, height: 14 }}
            {...props}
        >
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}
// 에니메이션 효과
// function TransitionComponent(props: TransitionProps) {
//     const style = useSpring({
//         from: {
//             opacity: 0,
//             transform: 'translate3d(20px,0,0)',
//         },
//         to: {
//             opacity: props.in ? 1 : 0,
//             transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
//         },
//     });

//     return (
//         <animated.div style={style}>
//             <Collapse {...props} />
//         </animated.div>
//     );
// }

const StyledTreeItem = styled((props: TreeItemProps) => (
    // 에니메이션 효과 추가 TransitionComponent
    // <TreeItem {...props} TransitionComponent={TransitionComponent} />
    <TreeItem {...props}
    />
))(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 5,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

/**
 * @description tree view 생성 interface
 * - treeItemSelectHandler 함수는 입력된 id 배열을 리턴 한다.
 */
interface CustomTreeViewInterface {
    iconType: 'folder' | 'square' | 'expand'
    isMultiSelect?: boolean
    height?: number | string
    width?: number | string
    treeNodes?: CustomTreeItemInterface[]
    treeItemSelectHandler: ((event: React.SyntheticEvent, nodeIds: string[]) => void)
    contextMenuList?: NodeWithContextMenuChildren[]
}

interface CustomTreeItemInterface {
    id: string
    label: string
    children?: readonly CustomTreeItemInterface[]
}

interface NodeWithContextMenu {
    id: string
    label: string
    children?: NodeWithContextMenuChildren[]
}

interface NodeWithContextMenuChildren {
    label: string
    onClickHandler: React.MouseEventHandler<HTMLLIElement>
}

const defaultMaxWidth = 600;
const defaultWidth = '100%';
const defaultHeight = '100%';

// eslint-disable-next-line @typescript-eslint/no-redeclare
const NodeWithContextMenu = ({ id, label, children }: NodeWithContextMenu) => {
    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const contextMenuHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6
                }
                : null
        );
    };

    const contextMenuCloseHandler = () => {
        setContextMenu(null);
    };

    return (
        <div onContextMenu={contextMenuHandler} style={{ cursor: "context-menu" }}>
            <Typography>{label}</Typography>
            <Menu
                open={contextMenu !== null}
                onClose={contextMenuCloseHandler}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
                id={id}
            >

                {
                    Array.isArray(children)
                        ?
                        children.map((node: NodeWithContextMenuChildren) => (
                            <MenuItem
                                key={`tree-menu-item-key-${node.label}-${id}`}
                                id={id}
                                onClick={node.onClickHandler}
                            >
                                {node.label}
                            </MenuItem>
                        ))
                        : null
                }
            </Menu>
        </div>
    );
};

const CustomTreeView = ({
    iconType,
    isMultiSelect,
    height,
    width,
    treeNodes,
    treeItemSelectHandler,
    contextMenuList
}: CustomTreeViewInterface) => {

    const treeItemMultiSelectHandler = (event: React.SyntheticEvent, nodeIds: string[]) => {
        treeItemSelectHandler(event, nodeIds);
    };

    const treeItemSingleSelectHandler = (event: React.SyntheticEvent, nodeIds: string) => {
        let ids: string[] = [];
        ids.push(nodeIds);
        treeItemSelectHandler(event, ids);
    };

    const treeViewContextMenuHandler = (event: React.MouseEvent<HTMLUListElement>) => {
        console.log('treeViewContextMenuHandler');
        event.preventDefault();
    }

    /**
     * @description tree item 생성
     * - 전달받은 array 로 children 만큼 tree item 을 생성 한다.
     * @param TreeItemInterface 
     * @returns TreeItems
     */
    const TreeItems = ({ id, label, children }: CustomTreeItemInterface) => {
        return (
            <StyledTreeItem
                key={`tree-view-item-key-${id}-${label}`}
                id={id}
                nodeId={id}
                label={
                    contextMenuList
                        ? <NodeWithContextMenu
                            id={id}
                            label={label}
                            children={contextMenuList}
                        />
                        : label
                }
            >
                {
                    Array.isArray(children)
                        ?
                        children.map((item: CustomTreeItemInterface) => (
                            <TreeItems
                                key={item.id}
                                id={item.id}
                                label={item.label}
                                children={item.children}
                            />
                        ))
                        :
                        null
                }
            </StyledTreeItem>
        )
    }

    const collapseIcon = () => {
        switch (iconType) {
            case 'folder':
                return <FolderOpen />
            case 'square':
                return <MinusSquare />
            case 'expand':
                return <ExpandMore />
            default:
                return <FolderOpen />
        }
    }

    const expandIcon = () => {
        switch (iconType) {
            case 'folder':
                return <Folder />
            case 'square':
                return <PlusSquare />
            case 'expand':
                return <ChevronRight />
            default:
                return <Folder />
        }
    }

    const endIcon = () => {
        switch (iconType) {
            case 'folder':
                return <FolderOff />
            case 'square':
                return <CloseSquare />
            case 'expand':
                return null
            default:
                return <FolderOff />
        }
    }

    if (isMultiSelect) {
        return (
            <TreeView
                aria-label="custom-tree-view"
                defaultCollapseIcon={collapseIcon()}
                defaultExpandIcon={expandIcon()}
                defaultEndIcon={endIcon()}
                multiSelect
                onNodeSelect={treeItemMultiSelectHandler}
                onContextMenu={treeViewContextMenuHandler}
                sx={{
                    height: Utils.NumberUtil.isNumber(height) ? height === 0 ? defaultHeight : height : Utils.StringUtil.isNull(height?.toString()) ? defaultHeight : height,
                    width: Utils.NumberUtil.isNumber(width) ? width === 0 ? defaultWidth : width : Utils.StringUtil.isNull(width?.toString()) ? defaultWidth : width,
                    maxWidth: { defaultMaxWidth },
                    flexGrow: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden'
                }}
            >
                {
                    Array.isArray(treeNodes)
                        ?
                        treeNodes.map((item) => (
                            <TreeItems
                                key={item.id}
                                id={item.id}
                                label={item.label}
                                children={item.children}
                            />
                        ))
                        : null
                }
            </TreeView>
        );
    }
    else {
        return (
            <TreeView
                aria-label="custom-tree-view"
                defaultCollapseIcon={collapseIcon()}
                defaultExpandIcon={expandIcon()}
                defaultEndIcon={endIcon()}
                onNodeSelect={treeItemSingleSelectHandler}
                onContextMenu={(e: React.MouseEvent<HTMLUListElement>) => { treeViewContextMenuHandler(e) }}
                sx={{
                    height: Utils.NumberUtil.isNumber(height) ? height === 0 ? defaultHeight : height : Utils.StringUtil.isNull(height?.toString()) ? defaultHeight : height,
                    width: Utils.NumberUtil.isNumber(width) ? width === 0 ? defaultWidth : width : Utils.StringUtil.isNull(width?.toString()) ? defaultWidth : width,
                    maxWidth: { defaultMaxWidth },
                    flexGrow: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden'
                }}
            >
                {
                    Array.isArray(treeNodes)
                        ?
                        treeNodes.map((item) => (
                            <TreeItems
                                key={item.id}
                                id={item.id}
                                label={item.label}
                                children={item.children}
                            />
                        ))
                        : null
                }
            </TreeView>
        );
    }
}
export type { NodeWithContextMenuChildren }
export { CustomTreeView }