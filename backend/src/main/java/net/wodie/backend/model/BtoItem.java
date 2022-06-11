package net.wodie.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

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
    private String description2;
    private String pictureLink;
    private String status;
    private String actionOwner;
    private List<String> actionMembers;
    private List<String> actionNotMembers;
}
