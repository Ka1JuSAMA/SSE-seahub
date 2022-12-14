import React from 'react';
import PropTypes from 'prop-types';
import { Utils } from '../../../utils/utils.js';
import { siteRoot, gettext } from '../../../utils/constants';

const { enableSysAdminViewRepo } = window.sysadmin.pageOptions;

const RepoItemPropTypes = {
  repo: PropTypes.object.isRequired,
  showDeleteRepoDialog: PropTypes.func.isRequired,
};

class RepoItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      highlight: false,
    };
  }

  onMouseEnter = () => {
    this.setState({ highlight: true });
  }

  onMouseLeave = () => {
    this.setState({ highlight: false });
  }

  render() {
    const repo = this.props.repo;
    const highlight = this.state.highlight;
    let iconUrl = Utils.getLibIconUrl(repo);
    return (
      <tr className={highlight ? 'tr-highlight' : ''} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <td><img src={iconUrl} width="24" alt={gettext('icon')}/></td>
        { enableSysAdminViewRepo ?
          <td><a href={siteRoot + 'sys/libraries/' + repo.repo_id + '/' + repo.name + '/'}>{repo.name}</a></td>
          :
          <td>{repo.name}</td>
        }
        <td>{Utils.bytesToSize(repo.size)}{' '}</td>
	{ this.props.orgID == -1 ?
          <td className="cursor-pointer text-center" onClick={this.props.showDeleteRepoDialog.bind(this, repo)}>
            <span className={`sf2-icon-delete action-icon ${highlight ? '' : 'vh'}`} title="Delete"></span>
          </td>
          :
          <td></td>
	}
      </tr>
    );
  }
}

RepoItem.propTypes = RepoItemPropTypes;

export default RepoItem;
