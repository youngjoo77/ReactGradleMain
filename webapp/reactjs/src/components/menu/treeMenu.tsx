import { useNavigate } from 'react-router';
import TreeView from '@mui/lab/TreeView';
import {ExpandMore, ChevronRight} from '@mui/icons-material';
import TreeItem from '@mui/lab/TreeItem';
import { Container, CssBaseline, Typography, Box } from "@mui/material"
const TreeMenu = () => {
	const navigate = useNavigate();
	
	
	
  return (
	<Container component="aside">
		<CssBaseline/>
		<TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      sx={{overflowY: 'auto' }}
      className = ''
    >
      <TreeItem nodeId="1" label="MAIN" onClick={props => navigate("/main")} />
      <TreeItem nodeId="2" label="TEST">
        <TreeItem nodeId="2-1" label="TEST 1" onClick={props => navigate("/testPage1")}/>
        <TreeItem nodeId="2-2" label="TEST 2" onClick={props => navigate("/testPage2")}/>
      </TreeItem>
    </TreeView>
	</Container>
  );
}

export default TreeMenu