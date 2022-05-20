package net.wodie.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection= "btoItems")
public class BtoItem {

    @Id
    private String id;
    private String displayId;
    private String category;
    private String title1;
    private String title2;
    private String description;
    private String status;
    private String actionOwner;
    private String[] actionMembers;
    private String[] actionNotMembers;
}
