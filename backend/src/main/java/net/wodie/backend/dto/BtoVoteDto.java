package net.wodie.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BtoVoteDto {
    private List<String> actionMembers;
    private List<String> actionNotMembers;
}
