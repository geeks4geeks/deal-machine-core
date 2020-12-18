import React, { PureComponent } from 'react';
import { Wrapper, Card, DropzoneButton, Button } from 'app/NativeComponents/common';
import { MenuButton } from 'app/NativeComponents/snippets';

class UploadButton extends PureComponent{


  render(){
    if(this.props.user.team_clearance_level > 0 && this.props.device == "desktop"){

      return (
        <Button onPress={()=>{}}>
          <DropzoneButton
            style={{
              height: "auto",
              alignSelf: "stretch"
            }}
            accept="text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onDrop={(acceptedFiles)=>{
              this.props.uploadList({
                acceptedFiles: acceptedFiles,
                token: this.props.token,
                type: "bulk_list"
              });

            }}
          >
            <MenuButton
              to=""
              disabled
              onPress={()=>{}}
              title="Import List"
              text="import a .csv or .xlsx and add those leads to your account"
              icon="file_upload"
            />
          </DropzoneButton>
        </Button>

      );
    }

    return <Wrapper />;


  }

}

export default UploadButton;
