type applicantDataType = {
   _id?: string;
   uid?: string;
   __v?: number;
   email?: string;
   profileId?: string;
   profile?: string;
   resume?: string;
   username?: string;
   bio?: string;
   education?: string;
   experience?: string;
   company?: string;
   time?: number;
   yearsOrMonth?: string;
   phone?: number;
   linkedin?: string;
   gitHub?: string;
   isSaved?:boolean;
};

export default applicantDataType;
