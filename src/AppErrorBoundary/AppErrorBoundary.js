import {Component} from "react";
import { recordAppError } from "../Util/Forensics";

export default class AppErrorBoundary extends Component {

  constructor(props) {
    super(props);
  }

  componentDidCatch(error, info) {
    recordAppError({
      from: 'app-error-boundary',
      message: error.message
    });
  }

  render () {
    return this.props.children;
  }
}
